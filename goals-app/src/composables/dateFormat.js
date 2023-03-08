export function useDateFormat() {

    const formatDate = (dateString) => {
        const date = new Date(dateString);
      
        // Format the date component as "M/D/YYYY"
        const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      
        // Format the time component as "h:mm:ss a"
        const hours = date.getHours() % 12 || 12; // Convert to 12-hour format
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        const amOrPm = date.getHours() >= 12 ? 'pm' : 'am';
        const formattedTime = `${hours}:${minutes}:${seconds} ${amOrPm}`;
      
        // Combine the formatted date and time components
        const formattedDateTime = `${formattedDate}, ${formattedTime}`;
        return formattedDateTime;
      }

  return { formatDate }
}