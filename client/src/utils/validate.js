export const checkValidData = (password) => {

    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)
    
   
    if(!isPasswordValid){
        return `Password should contain atleast 8 characters, including:
                    -uppercase letter
                    -lowercase letter
                    -numerals
                    -special character`;
    }

    return null;
} 