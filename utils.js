

export const convertUnixTime = (timestamp) => new Date(timestamp * 1000).toLocaleString();  

export const getHrMin = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    return `${hours}:${minutes}`;    
}

// const convertTimestampToReadable = (timestamp) => {
//     const date = new Date(timestamp * 1000); // Convert to milliseconds

//     const year = date.getFullYear();
//     const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-indexed
//     const day = ('0' + date.getDate()).slice(-2);
//     const hours = ('0' + date.getHours()).slice(-2);
//     const minutes = ('0' + date.getMinutes()).slice(-2);
//     const seconds = ('0' + date.getSeconds()).slice(-2);

//     return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
// };