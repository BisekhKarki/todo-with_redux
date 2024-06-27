import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";


// export const showItems = createAsyncThunk("showItems",async ()=>{

//     const response = await fetch("https://todo-b7b0d-default-rtdb.firebaseio.com/todoList.json" ,{
//         method:"GET",
//         headers:{
//             "Content-Type" : "application/json"
//         },
        
//     })
//     try{
//         const result = await response.json()
//         console.log(result)
//         return Object.values(result)
//     }catch(e){
//         console.log(e)
//     }
    
// })

export const showItems = createAsyncThunk("showItems",async ()=>{

    const response = await fetch("https://6674f864a8d2b4d072ee462c.mockapi.io/todoList" ,{
        method:"GET",
        headers:{
            "Content-Type" : "application/json"
        },
        
    })
    try{
        const result = await response.json()
        return Object.values(result)
    }catch(e){
        console.log(e)
    }
    
})


export const createItems = createAsyncThunk("createItems",async (data)=>{

    const response = await fetch("https://6674f864a8d2b4d072ee462c.mockapi.io/todoList" ,{
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(data)
    })
    try{
        const result = await response.json()
        return Object.values(result)
    }catch(e){
        console.log(e)
    }
    
})


export const editItems = createAsyncThunk("editItems",async (data)=>{

    const response = await fetch(`https://6674f864a8d2b4d072ee462c.mockapi.io/todoList/${data.id}` ,{
        method:"PUT",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(data)
    })
    try{
        const result = await response.json()
        return Object.values(result)
    }catch(e){
        console.log(e)
    }
    
})



export const deleteItems = createAsyncThunk("deleteItems",async (data)=>{
    const response = await fetch(`https://6674f864a8d2b4d072ee462c.mockapi.io/todoList/${data.id}` ,{
        method:"DELETE",
    })
    try{
        return data.id
    }catch(e){
        console.log(e)
    }
    
})


export const list = createSlice({
    name:"list",
    initialState:{
        todos: [],
        loading:false,
        error:null,
    },
    reducers:{
    },
    extraReducers: (builder)=>{
        builder

        // Showing Todo List
        .addCase(showItems.pending,(state)=>{
            state.loading = true
        })

        .addCase(showItems.fulfilled, (state,action)=>{
            state.loading = false;
            state.todos = action.payload;
        })

        .addCase(showItems.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })


        // Creating Todo List
        .addCase(createItems.pending,(state)=>{
            state.loading = true
        })

        .addCase(createItems.fulfilled, (state,action)=>{
            state.loading = false;
            state.todos.push(action.payload)
        })

        .addCase(createItems.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })


        // Editing Todo List
        .addCase(editItems.pending,(state)=>{
            state.loading = true
        })

        .addCase(editItems.fulfilled, (state,action)=>{
            state.loading = false;
            state.todos = state.todos.map((item)=>{
                return action.payload.ID === item.id ? action.payload : item
            })
        })

        .addCase(editItems.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        

         // Deleting Todo List
         .addCase(deleteItems.pending,(state)=>{
            state.loading = true
        })

        .addCase(deleteItems.fulfilled, (state,action)=>{
            state.loading = false;
            const ids = action.payload.id
            state.todos = state.todos.filter((i)=>{
                return i.id !== ids
            })
        })

        .addCase(deleteItems.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        


    }

})

export default list.reducer