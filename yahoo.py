import pandas as pd
import yfinance as yf
from pymongo import MongoClient
# import os

# dbUrl = 'mongodb://localhost:27017'
dbUrl = 'mongodb+srv://forwoodb:q84ItPYwNm77gfFO@cluster0.7vsg6zn.mongodb.net/?appName=Cluster0'
# dbUrl = os.environ.get('MONGODB_URL')

# client = MongoClient(dbUrl)

# https://stackoverflow.com/questions/74721623/how-do-you-use-pymongo-to-connect-to-mongodb-atlas
client = MongoClient(dbUrl, tls=True, tlsAllowInvalidCertificates=True)

# print(client.admin.command("ping"))
db = client['test']

collection = db['stocks']

for stock in collection.find():
  data = yf.download(tickers=stock['ticker'], period='200d', interval='1d')
  print(data)
