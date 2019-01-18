# PostApp
Template Angular2-Node-MongoDB application for social post

Our proposed UI/UX Designer [prepared these wireframes for the project](https://www.figma.com/file/SySf689LDdKVnTrGKBO81i9W/Concierge-Application-Wireframes?node-id=0%3A1).

# Set-up
### Note: Please use the below instructions as written to run the app seamlessly
* Install Docker
    link: https://gist.github.com/rstacruz/297fc799f094f55d062b982f7dac9e41
* Clone repository
* Change to project dir
* Run CMD docker-compose build
* Run CMD docker-compose up
* Open URL http://localhost:8001/
#### If you notice any issues with the application when navigating to the above URL, pause for a moment and hit refresh. We have noticed that deviations from the above process may result in situation where you have to refresh the page.

# Set-up without Docker
* Install node version 8 or above
* Install mongodb server
* Clone repository
* Change to ./nodeApp directory
* run npm install
* run npm start

## Note for Google Sign-in
The Post Application doesn’t have any valid certificate. So, google sign-in page may display some warning.
# Unit Tests
* Navigate to the test folder to view unit tests
* For manual testing documentation, [please refer to this link](https://drive.google.com/file/d/1OQ5Blbrb9tiyR1A6a4k2y0AWKUYH88Gx/view?usp=sharing)
