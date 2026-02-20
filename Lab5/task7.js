function getInitials(department) {
    const words = department.split(" ");
    let initials = "";
    for (let word of words) {
        initials += word.charAt(0).toLowerCase();
    }
    return initials;
}

function generateEmail(fullName, department) {
    const nameParts = fullName.trim().split(" ");
    const firstName = nameParts[0].toLowerCase();
    const lastName = nameParts[nameParts.length - 1].toLowerCase();
    const deptInitials = getInitials(department);
    
    return firstName + "." + lastName + "@" + deptInitials + ".uni.edu";
}


const fullName = "Yasir Sultan";
const department = "Software Engineering";

const email = generateEmail(fullName, department);
console.log(email);