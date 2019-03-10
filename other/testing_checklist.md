## Manual testing steps

1. [ ] Navigate to `Settings` and turn on `Training` toggle
2. [ ] Navigate to `Record` page: 
    * there is a black banner saying `Training`
    
3. [ ] Click `Send` button: 
    * you should see missing location and species notification
    
4. [ ] Select a species, location and click `Send`: 
    * `login/send` popup appears
    
5. [ ] Click `Send` button in the popup and enter 
    * name: manual
    * surname: test
    * phone: 1234564
    
6. [ ] Click `Send` button:
    * the blank email warning appears
    
7. [ ] Enter missing email as `manualtest@gmail.com` and click `Send`:
    * you are taken back to home page and the red bubble soon becomes gray
    
8. [ ] Verify your submitted record with all the attributes (use website or warehouse)
    * You should see your record with all the attributes
    
9. [ ] Repeat the steps 4-8 but with attached two photos and all attributes having some value

10. [ ] Navigate to `Record` page

11. [ ] Select a species, location, attach 1 photo and select all other attributes and click `Send`

12. [ ] Click `Login` button in the popup and click `Register`

13. [ ] Click `Create` button
    * You should see all input fields highlighted red
    
14. [ ] Enter below and click `Create`
    * email: a temporary email from [here](https://temp-mail.org/en/option/refresh/)
    * name: manual
    * surname: test
    * password: test
    * password-repeat: test
    * toggle T&Cs
    * You should see a pop up asking to verify your email
    
15. [ ] Click `OK`
    * You should be back in the record create page
    
16. [ ] Verify your email address from the email inbox

17. [ ] Click `Send` record
    * you are taken back to `Home` page and the red bubble soon becomes gray
    
18. [ ] Verify your submitted record with all the attributes (use website or warehouse)
    * You should see your record with all the attributes
    
19. [ ] Click `Logout`
    * You should see `Login/Register` buttons
    
20. [ ] Click `Login`, then click `Request new password`

21. [ ] Enter a new password and click `Request`
    * A password reset email has arrived to your inbox
    
22. [ ] Reset your password on the website then login with your account in the app
    * You should be able to login
