const FilteredList = ({filteredUsers, handleClick}) => {
    if (filteredUsers.length) {
        return (
            <div>
                <ul>
                    {
                        filteredUsers.map((userName, index) => {
                            return (
                                <li key={index} onClick={handleClick}>
                                    {userName}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    } else {

    }
}

export default FilteredList;