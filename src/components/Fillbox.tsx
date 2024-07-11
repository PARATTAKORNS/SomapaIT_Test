import { Box, MenuItem, Button, TextField, Stack, Grid } from "@mui/material";
import React from "react";
import Table from "./Table";
import { useForm } from 'react-hook-form';

type PostData = {
  fname: string;
  lname: string;
  gender: string;
  score: number;
};

export default function Fillbox() {
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

  return (
    <>
     <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid item xs={6}>
            <TextField 
          type="text" 
          label="Firstname"
          {...register('fname', { required: "Firstname is required." })}
          error={!!errors.fname}
          helperText={errors.fname?.message}
        />  
          </Grid>
          <Grid item xs={6}>
            <TextField 
        type="text" 
        label="Lastname"
        {...register('lname', { required: "Lastname is required." })}
        error={!!errors.lname}
        helperText={errors.lname?.message}
      />
          </Grid>
          <Grid item xs={6}>
            <Box width="250px">
            <TextField
              label="Select Gender"
              select
              {...register('gender', { required: "Gender is required." })}
              error={!!errors.gender}
              helperText={errors.gender?.message}
              onChange={handleGenderChange}
              fullWidth
            >
              <MenuItem value=""></MenuItem>
              <MenuItem value="M">Male</MenuItem>
              <MenuItem value="F">Female</MenuItem>
              <MenuItem value="U">Unknown</MenuItem>
            </TextField>
          </Box>    
          </Grid>
          <Grid item xs={6}>
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
            inputProps={{ min: 0, max: 100 }}
          />  
          </Grid>  
        </Grid>
      </Grid>
        
      
      
      
      <Button type="submit" variant="contained">Add</Button>
      <Button type="button" variant="outlined">Cancel</Button>
    </form>
    <Table></Table>  
    </>
  );
}
