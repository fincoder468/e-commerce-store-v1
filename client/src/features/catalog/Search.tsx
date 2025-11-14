import { debounce, TextField } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../app/store/store";
import { setSearchTerm } from "./catalogSlice";
import { useEffect, useState } from "react";

export const Search = () => {
    const { searchTerm } = useSelector((state: RootState) => state.catalog);
    const dispatch = useDispatch();
    const [term, setTerm] = useState(searchTerm);

    useEffect(()=>{
        setTerm(searchTerm);
    }, [searchTerm])

    const debouncedSearch = debounce(event => {
        dispatch(setSearchTerm(event.target.value));
    }, 500)

  return (
    <TextField
        label='Search products'
        variant="outlined"
        fullWidth 
        type = "search"
        value = {term}
        onChange = {e=> {
            setTerm(e.target.value);
            debouncedSearch(e);
        }}
        />
  )
}