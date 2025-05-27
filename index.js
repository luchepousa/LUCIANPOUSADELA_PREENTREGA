const URL = 'https://fakestoreapi.com/products';

let [,, metodo, recurso, ...extras] = process.argv;

if (recurso.includes('/')) {
    const [parte1, parte2] = recurso.split('/');
    recurso = parte1;
    extras = [parte2, ...extras];
}

const fetchData = async () => {
    try {
        if (metodo === 'GET' && recurso === 'products') {
            if (extras.length === 0) {
                const response = await fetch(URL);
                const data = await response.json();
                console.log(data);
            } else {
                const [id] = extras;
                const response = await fetch(`${URL}/${id}`);
                const data = await response.json();
                console.log(data);
            }
        }

        else if (metodo === 'POST' && recurso === 'products') {
            const [titulo, precio, categoria] = extras;

            const body = '{ "title": "' + titulo + '", "price": "' + precio + '", "category": "' + categoria + '" }';

            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body
            });

            const data = await response.json();
            console.log("Producto creado:");
            console.log(data);
        }

        else if (metodo === 'DELETE' && recurso === 'products') {
            const [id] = extras;

            const response = await fetch(`${URL}/${id}`, {
                method: 'DELETE'
            });

            const data = await response.json();
            console.log("Producto eliminado:");
            console.log(data);
        }

        else {
            console.log(`Comando no reconocido. Usá uno de estos:
- npm run start GET products
- npm run start GET products <productId>
- npm run start POST products <title> <price> <category>
- npm run start DELETE products <productId>
`);
        }
    } catch (error) {
        console.error(error);
    }
};

fetchData();
