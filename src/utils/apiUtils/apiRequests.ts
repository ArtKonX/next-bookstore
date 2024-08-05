import axios from 'axios';

export const getRoleAndBalance = async () => {
    try {
        const response = await axios.get('../api/auth/role-and-balance');
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

export const getAllBooksData = async () => {
    try {
        const response = await axios.get('../api/admin/all-books');
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
        const response = await axios.put(`../api/admin/change-price/${id}`, {
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

export const putBookIsHidden = async ({ id, isHidden }: { id: object, isHidden: boolean | undefined }) => {

    try {
        const response = await axios.put(`../api/admin/change-hidden/${id}`, {
            isHidden
        });
        if (response.status === 200) {
            console.log('The book isHidden change was successful');
        }
    }
    catch (error) {
        console.error('Error changing the isHidden:', error);
    };
}

export const addReminders = async (data: { email: string | null | undefined; reminders: string }) => {
    try {
        const response = await axios.post('../api/admin/reminders-rent-users', data);
        if (response.status === 200) {
            console.log('Subscription added successfully');
            window.location.reload()
        }
    } catch (error) {
        console.error('Failed to add subscription:', error);
    }
};

export const getAllRentsData = async () => {
    try {
        const response = await axios.get('../api/admin/rent-books-user');
        if (response.status === 200) {
            console.log('The rent books data was received successfully');
            return JSON.parse(JSON.stringify(response.data));
        }
    } catch (error) {
        console.error('Failed to fetch books:', error);
    }
};

export const getRemindersUserData = async () => {
    try {
        const response = await axios.get('../api/auth/reminders-user');
        if (response.status === 200) {
            console.log('The rent books data was received successfully');
            return JSON.parse(JSON.stringify(response.data));
        }
    } catch (error) {
        console.error('Failed to fetch books:', error);
    }
};

export const addBook = async (data: {
    author: string,
    title: string,
    catagory: string,
    yearOfWriting: number,
    price: number,
    isHidden: boolean,
    fileBook: string[] | undefined
}) => {
    try {
        const response = await axios.post('../api/admin/add-book', data);
        if (response.status === 200) {
            console.log('Successfully adding a book')
        }
    } catch (error) {
        console.error('Error added book:', error);
    }
};
