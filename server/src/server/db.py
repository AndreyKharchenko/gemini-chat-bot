from sqlalchemy import create_engine, select
from sqlalchemy.orm import sessionmaker, DeclarativeBase, Mapped, mapped_column

# Движок базы данных SQLite 
# Является пулом подключений к базе данных
# Нужен для создания сессий для работы с базой данных
engine  = create_engine(url="sqlite:///requests.db")

# Создание фабрики сессий
# Нужен для создания сессий для работы с базой данных
# Сессия - это объект, который управляет всеми операциями с базой данных
# Открываем сессиию, выполняем операции и закрываем сессию
session = sessionmaker(engine)

class Base(DeclarativeBase):
    pass

# Модель таблицы в базе данных
class ChatRequests(Base):
    __tablename__ = "chat_requests"

    id: Mapped[int] = mapped_column(primary_key=True)
    ip_address: Mapped[str] = mapped_column(index=True)
    prompt: Mapped[str]
    response: Mapped[str]


def get_user_requests(ip_address: str) -> list[ChatRequests]:
    with session() as new_session:
        query = select(ChatRequests).filter_by(ip_address=ip_address)
        result = new_session.execute(query)
        return result.scalars().all()

def add_request_data(ip_address: str, prompt: str, response: str) -> None:
    with session() as new_session:
        request_data = ChatRequests(ip_address=ip_address, prompt=prompt, response=response)
        new_session.add(request_data)
        new_session.commit()

