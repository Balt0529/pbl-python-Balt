from sqlalchemy import String,Integer,Column
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped


class Base(DeclarativeBase):
    pass

class Sauna(Base):
    __tablename__ = "sauna"

    name:Mapped[str]=Column("name",String(80),primary_key=True)
    temp_lo:Mapped[int]=Column("temp_lo",Integer)
    temp_hi:Mapped[int]=Column("temp_hi",Integer)
    place:Mapped[str]=Column("place",String(80))

