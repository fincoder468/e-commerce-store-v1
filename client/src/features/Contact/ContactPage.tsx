import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./counterSlice";
import type { RootState } from "../../app/store/store";

export const ContactPage = () => {
  const data = useSelector((state: RootState) => state.counter.data);
  const dispatch = useDispatch();
  return (
    <>
    <Typography variant="h2">
      Contact Page
      </Typography>
      <Typography variant="body1">
        the data is: {data}
      </Typography>
      <button onClick={() => dispatch(increment(5))}>Increment</button>
      <button onClick={() => dispatch(decrement(3))}>Decrement</button>
    </>
  )
}