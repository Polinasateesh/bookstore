import React, { useEffect, useState } from 'react';
import { TextField, Autocomplete, Card } from '@mui/material';

const SearchBar = ({ onSearch }) => {
  
  
    const options = [
        { label: 'Fiction', id: 1 },
        { label: 'Non-Fiction', id: 2 },
      ];
    return (
        <>
      
        <Card className='search-card-container'>
             <TextField id="outlined-basic" label="Search" variant="outlined" size='small' onChange={(e) => onSearch(e.target.value)}  />
             </Card>
              <Card className='search-card-container'>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={options}
                sx={{ width: 200 }}
                size='small'
                renderInput={(params) => <TextField {...params} label="Category" />}
            />
            </Card>
            </>
       
    );
};

export default SearchBar;
