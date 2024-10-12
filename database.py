from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from models import Sauna

# 接続先DBの設定
DATABASE = 'postgresql+psycopg://user:postgres@localhost:5432/postgres'

# Engine の作成
Engine = create_engine(
  DATABASE,
  echo=True
)

# Sessionの作成
session = Session(
  autocommit = False,
  autoflush = True,
  bind = Engine
)

def read_sauna():
    return session.query(Sauna).all()

def add_sauna(name,temp_lo,temp_hi,place):
    db_sauna=Sauna(name=name,temp_lo=temp_lo,temp_hi=temp_hi,place=place)
    session.add(db_sauna)
    session.commit()
    session.refresh(db_sauna)
    return db_sauna

def delete_sauna(sauna_name):
    db_sauna=session.query(Sauna).filter(Sauna.name==sauna_name).delete()
    return db_sauna