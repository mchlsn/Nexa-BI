# Data Preprocessing Pipeline -NexaBI
# PIC : Michael Sanjaya

import pandas as pd
import numpy as np

def load_data(filepath: str) -> pd.DataFrame:
    """Load Global Supertore dataset dari file CSV"""
    df = pd.read_csv(filepath)
    print(f"Data berhasil dimuat: {df.shape[0]} baris, {df.shape[1]} kolom")
    return df

def clean_data(df: pd.DataFrame) -> pd.DataFrame:
    """Bersikan data : haus duplikat, baris kosong, dan kolom tidak penting"""
    df = df.drop_duplicates()
    df = df.dropna(subset=["Order ID","Customer ID","Sales"])
    df["Order Date"]= pd.to_datetime(df["Order Date"], dayfirst=True)
    print(f"Data setelah dibersihkan: {df.shape[0]} baris")
    return df

def compute_rfm(df: pd.DataFrame) -> pd.DataFrame:
    """Hitung RFM (Recency, Frequency, Monetary) per customer."""
    snapshot_date = df["Order Date"].max() + pd.Timedelta(days=1)

    rfm = df.groupby("Customer ID").agg(
        Recency=("Order Date", lambda x: (snapshot_date - x.max()).days),
        Frequency=("Order ID", "nunique"),
        Monetary=("Sales", "sum")
    ).reset_index()

    print(f"RFM berhasil dihitung untuk {rfm.shape[0]} customer")
    return rfm


def build_basket_matrix(df: pd.DataFrame) -> pd.DataFrame:
    """Buat transaction matrix per order untuk Market Basket Analysis."""
    basket = (df.groupby(["Order ID", "Product Name"])["Quantity"]
              .sum().unstack().fillna(0))
    basket = basket.applymap(lambda x: 1 if x > 0 else 0)
    print(f"Basket matrix selesai: {basket.shape[0]} order, {basket.shape[1]} produk")
    return basket