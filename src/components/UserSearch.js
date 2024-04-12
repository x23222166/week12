import {useState, useEffect} from 'react';
import FilteredList from './FilteredList';

const UserSearch = () => {
    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        retrieveUsersList();
    }, []);

    const retrieveUsersList = async () => {
        try {
            const data = await fetch('https://dummyjson.com/users');
            const parsedData = await data.json();

            if (parsedData.users) {
                const userFirstNameList = parsedData.users.map(user => user.firstName);
                setUsers(userFirstNameList);
                setIsLoading(false);
                setError('');
            }
        } catch (e) {
            setError(e);
        }
        setIsLoading(false);
    }

    const handleChange = (e) => {
        e.preventDefault();
        const query = e.target.value.toLowerCase();
        setQuery(query);

        if (query.length && users.length) {
            const filteredData = users.filter(item => item.toLowerCase().indexOf(query) >= 0);
            setFilteredUsers(filteredData);
        } else {
            setFilteredUsers([]);
        }
    }

    const handleClick = e => {
        e.preventDefault();
        setQuery(e.target.innerText);
        setFilteredUsers([]);
    }


    if (isLoading) {
        return (
            <div>
                <h1>Loading data from server! Please wait...</h1>
            </div>
        )
    } else if (error) {
        return (
            <div>
                <h1>{error}</h1>
            </div>
        )
    } else {
        return (
            <div>
                <p>Search and select your username below</p>
                <input value={query} onChange={handleChange} />
                <FilteredList filteredUsers={filteredUsers} handleClick={handleClick}/>
                <br /><hr />
            </div>
        )
    }
}

export default UserSearch;