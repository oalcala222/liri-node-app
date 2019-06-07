# Heading 1 Liri node app

The Liri Node App allows users to run through different commands declared directly in the terminal using node.js. Through the CLI, the user will run the liri.js file and input 1 of the 4 following commands 

![Image](https://i.imgur.com/zknlzku.png)

as well as a search parameter for the command as listed below:

Commands & Parameter:
  * "*spotify-this-song*" *Song*
      - Calls the Spotify API and returns the result matching the song you entered. 

      ![Image](https://i.imgur.com/d5o6vle.png)
      
  
  - "*concert-this*" *Artist*
     - Calls the Bands In Town API and returns the results for concert matching the artist that you entered using the AXIOS NPM module.  
      
  - "*movie-this*" *Movie*
      - Calls the IMBD API and display the details of the movie you searched for using the AXIOS NPM module.  

      ![Image](https://i.imgur.com/EQInTuD.png)
    
  - "*do-what-it-says*" n/a
      - This command calls liri.js and it will read a parameter from the file "random.txt". The command will automatically search Spotify for the term that was read from the Random.txt file.  

      ![Image](https://i.imgur.com/eF1otvx.png)
        
 
 
Dependancies Used in APP:
- fs
- moment
- node-spotify-api
- axios


Images of Functioning APP:

![Image](https://i.imgur.com/vVhBbYM.png)
![Image](https://i.imgur.com/thXHwPB.png)



