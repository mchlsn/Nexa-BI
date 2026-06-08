# Market Basket Analysis - NexaBI
# PIC: Irisaliya Irhabiyah Banat

import ast
import pandas as pd
from mlxtend.preprocessing import TransactionEncoder
from mlxtend.frequent_patterns import apriori, association_rules


def load_basket(filepath: str) -> pd.DataFrame:
    """
    Load df_basket.csv dan konversi kolom Products
    dari string menjadi list Python.

    Format df_basket.csv:
        Order ID | Products
        CA-001   | "['Binders', 'Paper', 'Art']"
    """
    df = pd.read_csv(filepath)
    df['Products'] = df['Products'].apply(ast.literal_eval)
    return df


def encode_transactions(df_basket: pd.DataFrame) -> pd.DataFrame:
    """
    Ubah list transaksi menjadi boolean matrix
    menggunakan TransactionEncoder.

    Input : DataFrame dengan kolom 'Products' berisi list
    Output: DataFrame boolean (True/False per produk per order)
    """
    te = TransactionEncoder()
    te_array = te.fit_transform(df_basket['Products'])
    df_encoded = pd.DataFrame(te_array, columns=te.columns_)
    return df_encoded


def run_apriori(df_encoded: pd.DataFrame,
                min_support: float = 0.005,
                min_confidence: float = 0.1,
                min_lift: float = 1.0):
    """
    Jalankan Apriori dan kembalikan association rules
    yang sudah difilter.

    Parameter:
        df_encoded     : output dari encode_transactions()
        min_support    : minimum support (default 0.005 = 0.5%)
        min_confidence : minimum confidence untuk filter (default 0.1)
        min_lift       : minimum lift untuk filter (default 1.0)

    Return:
        rules_filtered : DataFrame rules diurutkan lift tertinggi,
                         kolom: antecedents, consequents,
                                support, confidence, lift
    """
    # Cari frequent itemsets
    frequent = apriori(df_encoded, min_support=min_support,
                       use_colnames=True)

    # Generate semua rules
    rules = association_rules(frequent, metric='confidence',
                              min_threshold=0.01)

    # Filter berdasarkan confidence dan lift
    rules_filtered = rules[
        (rules['confidence'] >= min_confidence) &
        (rules['lift'] >= min_lift)
    ].sort_values('lift', ascending=False)

    # Ambil kolom penting saja
    rules_filtered = rules_filtered[[
        'antecedents', 'consequents',
        'support', 'confidence', 'lift'
    ]]

    print(f"Frequent itemsets : {len(frequent)}")
    print(f"Total rules       : {len(rules)}")
    print(f"Rules setelah filter: {len(rules_filtered)}")

    return rules_filtered