import axios from "axios";



export const getImages = ( page, q) => {
  
    
    return axios.get('https://pixabay.com/api/', {
      params: {
        q,
        page,
        key: '33055694-6965e9dfecd686cd6e0cc5baf',
        image_type: 'photo',
        orientation: 'horizontal',
        per_page:12,

    }})
    
  }