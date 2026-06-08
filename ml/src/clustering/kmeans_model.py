# K-Means Customer Segmentation - NexaBI
# PIC: Irisaliya Irhabiyah Banat

import joblib
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

def train_kmeans(df_rfm: pd.DataFrame, n_clusters: int = 2):
    """
    Train K-Means pada data RFM yang sudah di-scaling.

    Parameter:
        df_rfm     : DataFrame hasil preprocessing, harus memiliki kolom:
                     'Recency_scaled', 'Frequency_scaled', 'Monetary_scaled'
        n_clusters : jumlah cluster (default 2 berdasarkan Silhouette Analysis)

    Return:
        df_result  : DataFrame original + kolom 'Cluster' (dimulai dari 1)
        model      : model KMeans yang sudah dilatih
    """
    # Ambil kolom yang sudah di-scaling
    df = df_rfm[['Recency_scaled', 'Frequency_scaled', 'Monetary_scaled']]

    # Latih model K-Means
    model = KMeans(n_clusters=n_clusters, random_state=42)
    cluster_labels = model.fit_predict(df)

    # Tambahkan kolom Cluster ke DataFrame (dimulai dari 1, bukan 0)
    df_result = df_rfm.copy()
    df_result['Cluster'] = cluster_labels + 1

    print(f"K-Means selesai: {n_clusters} cluster")
    print(f"Jumlah anggota tiap cluster:\n{df_result['Cluster'].value_counts()}")

    return df_result, model


def save_model(model, filepath: str = "model_clustering.h5"):
    """Simpan model KMeans ke file."""
    joblib.dump(model, filepath)
    print(f"Model disimpan ke: {filepath}")


def silhouette_analysis(df_rfm: pd.DataFrame, max_k: int = 10):
    """
    Cari jumlah cluster optimal menggunakan Silhouette Score.
    Jalankan ini di notebook untuk eksplorasi.

    Parameter:
        df_rfm : DataFrame dengan kolom scaled
        max_k  : jumlah cluster maksimum yang dicoba
    """
    df = df_rfm[['Recency_scaled', 'Frequency_scaled', 'Monetary_scaled']]

    for k in range(2, max_k + 1):
        kmeans = KMeans(n_clusters=k, random_state=0)
        kmeans.fit(df)
        score = silhouette_score(df, kmeans.labels_)
        print(f"n_clusters={k}, silhouette score={score:.4f}")