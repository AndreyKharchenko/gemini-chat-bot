from contextlib import asynccontextmanager

from fastapi import Body, FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from dotenv import load_dotenv
load_dotenv()

from server.gemini_client import get_answer_from_gemini

from server.db import Base, engine, get_user_requests, add_request_data

@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(engine)
    print("Таблицы созданы")
    yield

app = FastAPI(lifespan=lifespan)

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/requests")
def get_my_requests(request: Request):
    user_ip_address = request.client.host if request.client else ""
    user_requests = get_user_requests(ip_address=user_ip_address)
    return { "requests": user_requests }


@app.post("/requests")
def send_prompt(
    request: Request,
    prompt: str = Body(embed=True)
):
    user_ip_address = request.client.host if request.client else ""
    answer = get_answer_from_gemini(prompt)
    add_request_data(ip_address=user_ip_address, prompt=prompt, response=answer)
    return {"answer": answer}
