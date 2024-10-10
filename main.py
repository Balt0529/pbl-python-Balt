from typing import Union
from fastapi import FastAPI,Body
from pydantic import BaseModel
from database import read_sauna
from fastapi.middleware.cors import CORSMiddleware
from models import Sauna

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Item(BaseModel):
    name:str
    price:float
    is_offer:bool=None


@app.get("/")
def read_root():
    return {"Hello":"World"}

@app.get("/items/{item_id}")
def read_item(item_id:int, q:Union[str,None]=None):
    return {"item_id":item_id,"q":q}

@app.put("/items/{item_id}")
def update_item(item_id:int,item:Item):
    return{"item_name":item.name,"item_id":item_id}

@app.get("/sauna")
def read_sauna_endpoint():
    return read_sauna()

@app.post("/sauna")
def post_sauna(name:str=Body(...),temp_lo:int=Body(...),temp_hi:int=Body(...),place:str=Body(...)):
    sauna=Sauna(name=name,temp_lo=temp_lo,temp_hi=temp_hi,place=place)
    post_sauna(sauna)
    return {"message":"OK"}