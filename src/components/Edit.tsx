import { Box, MenuItem, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import Table from "./Table";
import { useParams } from "react-router-dom";
import axios from "axios";


type PostData = {
  fname: string;
  lname: string;
  gender: string;
  score: number;
};

export default function Fillbox() {
    const {id} = useParams();
    const [values, setValues] = useState({
        id: id,
        fname: '',
        lname: '',
        gender: '',
        score: 0
    })
    useEffect(() => {
        axios.get('http://localhost:3000/Users/'+id)
        .then(res => setValues({...values,
            fname: res.data.fname, lname: res.data.lname,
            gender: res.data.gender, score: res.data.score,}))
        .catch(err => console.log(err))
    }, [])

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<PostData>({
    defaultValues: {
      fname: '',
      lname: '',
      gender: '',
      score: 0
    }
  });

  const onSubmit = (data: PostData) => {
    console.log(data);
  };

  const handleGenderChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setValue('gender', event.target.value as string);
  };

  const handleScoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, score: Number(event.target.value) });
  };

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField 
        type="text" 
        label="Firstname"
        {...register('fname', { required: "Firstname is required." })}
        error={!!errors.fname}
        helperText={errors.fname?.message}
        value={values.fname}
        onChange={e=> setValues({...values, fname: e.target.value})}
      />
      <TextField 
        type="text" 
        label="Lastname"
        {...register('lname', { required: "Lastname is required." })}
        error={!!errors.lname}
        helperText={errors.lname?.message}
        value={values.lname}
        onChange={e=> setValues({...values, lname: e.target.value})}
      />
      <Box width="250px">
        <TextField
          label="Select Gender"
          select
          {...register('gender', { required: "Gender is required." })}
          error={!!errors.gender}
          helperText={errors.gender?.message}
          onChange={handleGenderChange}
          value={values.gender}
          fullWidth
        >
          <MenuItem value=""></MenuItem>
          <MenuItem value="M">Male</MenuItem>
          <MenuItem value="F">Female</MenuItem>
          <MenuItem value="U">Unknown</MenuItem>
        </TextField>
      </Box>
      <TextField 
        type="number" 
        label="Score" 
        {...register('score', { 
          required: "Score is required.",
          min: { value: 0, message: "Minimum is 0" },
          max: { value: 100, message: "Maximum is 100" }
        })}
        error={!!errors.score}
        helperText={errors.score?.message}
        value={values.score}
        onChange={handleScoreChange}
        inputProps={{ min: 0, max: 100 }}
      />
      <Button type="submit" variant="contained">Update</Button>
      <Button type="button" variant="outlined">Cancel</Button>
    </form>
    <Table />
    </>
  );
}
