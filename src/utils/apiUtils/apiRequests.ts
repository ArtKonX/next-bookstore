import axios from 'axios';

export const getRoleAndBalance = async () => {
    try {
        const response = await axios.get('../api/auth/roleAndBalance');
        if (response.status === 200) {
            console.log('The role and balance data was received successfully');
            return JSON.parse(JSON.stringify(response.data));
        }
    } catch (error) {
        console.error('Failed to fetch role and balance data:', error);
    }
};

export const getBook = async ({ slug }: {
    slug: string
}) => {
    try {
        const response = await axios.get(`../api/books/${slug}`)
        if (response.status === 200) {
            console.log('The book was received successfully');
            return response.data;
        }
    }
    catch (error) {
        console.error('An error occurred while receiving the book:', error);
    };
};

export const getRent = async ({ slug }: {
    slug: string
}) => {
    try {
        const response = await axios.get(`../api/rent-book/${slug}`)
        if (response.status === 200) {
            console.log('The rent was received successfully');
            return response.data;
        }
    }
    catch (error) {
        console.error('An error occurred while receiving the book:', error);
    };
};


export const getBooksData = async () => {
    try {
        const response = await axios.get('../api/books');
        if (response.status === 200) {
            console.log('The books data was received successfully');
            return JSON.parse(JSON.stringify(response.data));
        }
    } catch (error) {
        console.error('Failed to fetch books:', error);
    }
};

export const deleteBook = async (_id: any) => {
    try {
        const response = await axios.delete('../api/books', { data: { _id } });
        if (response.status === 200) {
            console.log('Book deleted successfully');
            window.location.reload()
        }
    } catch (error) {
        console.error('Failed to delete book:', error);
    }
};

export const putBookPrice = async ({ id, price }: { id: object, price: number }) => {

    try {
        const response = await axios.put(`/api/books/${id}`, {
            price
        });
        if (response.status === 200) {
            console.log('The book price change was successful');
        }
    }
    catch (error) {
        console.error('Error changing the price:', error);
    };
}
