document.addEventListener('DOMContentLoaded', () => {
    const moreUsersButton = document.getElementById('more-users');
    const profilesContainer = document.getElementById('profiles-container');
    const profilesTableBody = document.querySelector('#profiles-table tbody');

    moreUsersButton.addEventListener('click', fetchUsers);

    async function fetchUsers() {
        try {
            const response = await fetch('https://randomuser.me/api/?results=5');
            const data = await response.json();
            const users = data.results;
            
            // Clear previous profiles
            profilesContainer.innerHTML = '';
            profilesTableBody.innerHTML = '';

            // Display new profiles
            users.forEach(user => {
                // Create profile card
                const profileCard = document.createElement('div');
                profileCard.className = 'profile-card';

                const profileImage = document.createElement('img');
                profileImage.src = user.picture.large;

                const profileInfo = document.createElement('div');
                profileInfo.className = 'profile-info';
                
                const profileName = document.createElement('h2');
                profileName.textContent = `${user.name.first} ${user.name.last}`;

                const profileEmail = document.createElement('p');
                profileEmail.textContent = user.email;

                profileInfo.appendChild(profileName);
                profileInfo.appendChild(profileEmail);
                profileCard.appendChild(profileImage);
                profileCard.appendChild(profileInfo);
                profilesContainer.appendChild(profileCard);

                // Add user to table
                const tableRow = document.createElement('tr');
                const tableNameCell = document.createElement('td');
                tableNameCell.textContent = `${user.name.first} ${user.name.last}`;
                const tableEmailCell = document.createElement('td');
                tableEmailCell.textContent = user.email;

                tableRow.appendChild(tableNameCell);
                tableRow.appendChild(tableEmailCell);
                profilesTableBody.appendChild(tableRow);
            });
        } catch (error) {
            console.error('Error fetching user profiles:', error);
        }
    }
});
