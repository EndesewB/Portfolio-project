document.addEventListener('DOMContentLoaded', function () {
  const navigationLinks = document.querySelectorAll('.navigation a');
  const sections = document.querySelectorAll('section');

  navigationLinks.forEach(link => {
      link.addEventListener('click', function (event) {
          event.preventDefault(); // Prevent the default link behavior
          const targetId = this.getAttribute('href'); // Get the target section's ID
          const targetSection = document.querySelector(targetId);
          const aboutContent = targetSection.querySelector('.toggle-content'); // Add a class to the content to toggle
  
          // Hide all sections
          sections.forEach(section => {
              section.style.display = 'none';
          });
  
          // Toggle the visibility of the content in the clicked section
          if (aboutContent) {
              if (aboutContent.style.display === 'none' || aboutContent.style.display === '') {
                  aboutContent.style.display = 'block';
              } else {
                  aboutContent.style.display = 'none';
              }
          }
  
          // Show the target section
          targetSection.style.display = 'block';
      });
  });

  // Add the new code to display the welcome message and "Start Mine" button
  const loginForm = document.querySelector('#login form');
  const welcomeMessage = document.createElement('p');
  const startMineButton = document.createElement('button');
  
  loginForm.addEventListener('submit', async function (event) {
      event.preventDefault();
      
      const formData = new FormData(loginForm);
      const username = formData.get('username');
      
      // You can replace 'Your Username' with the actual username variable
      welcomeMessage.textContent = `Welcome, ${username}!`;
      
      startMineButton.textContent = 'Start Mine';
      startMineButton.addEventListener('click', function () {
          // Add your logic to start mining here
          alert('Mining started!');
      });

      // Append the welcome message and start mine button
      const loginSection = document.getElementById('login');
      loginSection.appendChild(welcomeMessage);
      loginSection.appendChild(startMineButton);
  });
});
