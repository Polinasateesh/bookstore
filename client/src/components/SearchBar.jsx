import React, { useEffect, useState } from "react";
import { TextField, Autocomplete, Card } from "@mui/material";

const SearchBar = ({ onSearch, searchTerm, selectCategory }) => {
  const options = [
    { label: "Fiction", id: 1 },
    { label: "Non-Fiction", id: 2 }
  ];
  return (
    <>
      <Card className="search-card-container">
        <TextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
          size="small"
          onChange={(event) => onSearch(event)}
          value={searchTerm}
        />
      </Card>
      <Card className="search-card-container">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={options}
          sx={{ width: 200 }}
          size="small"
          onChange={(event, value) => selectCategory(event, value)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Category"
            />
          )}
        />
        
      </Card>
    </>
  );
};

export default SearchBar;
