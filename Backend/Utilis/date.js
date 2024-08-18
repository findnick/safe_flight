// function formatDate(date) {
//     const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
//     return date.toLocaleDateString('en-US', options);
// }

// // Example usage
// const date = new Date('2024-05-14T21:28:00.593Z');
// // const formattedDate = formatDate(date);
// // console.log(formattedDate); // Output: 5/14/2024


// function compareDates(dateStr1, dateStr2) {
//     const date1 = new Date(dateStr1);
//     const date2 = new Date(dateStr2);

//     if (date1 < date2) {
//         return 1;
//     } else if (date1 > date2) {
//         return -1;
//     } else {
//         return 0;
//     }
// }

// // Example usage
// const issueDate = formatDate(date);
// console.log("Issue Date", issueDate);
// const expiryDate = '4/15/2024';

// console.log(compareDates(issueDate, expiryDate)); // Output: -1 (date1 is earlier than date2)
