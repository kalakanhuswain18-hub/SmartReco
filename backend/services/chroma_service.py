import chromadb

client = chromadb.PersistentClient(path="./chroma_db")

collection = client.get_or_create_collection(
    name="products"
)


def add_product_to_vector(product):

    collection.add(
        ids=[str(product.id)],
        documents=[
            f"""
            {product.name}

            {product.description}

            Category: {product.category}
            """
        ],
        metadatas=[
            {
                "category": product.category,
                "price": product.price
            }
        ]
    )
def search_products(query, n_results=3):

    results = collection.query(
        query_texts=[query],
        n_results=n_results
    )

    return results    