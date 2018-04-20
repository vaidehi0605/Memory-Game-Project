  /*
           * Global Variables for the Game
           1. cardArray - An array of all the symbols used to populate the createCards
           2. perviousCard - A placeholder element to hold previously clicked card
           3. totalMoves - total number of moves the user has currently made
           4. successCount - total number of matched pairs
           5. totalSeconds - total seconds elapsed since game began
           6. rating - users current rating based on total Moves
           7. timeTaken - Formatted Time elapsed since game began.
           */
  var cardArray = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"]
  var previousCard;
  var totalMoves = 0;
  var successCount = 0;
  var totalSeconds = 0;
  var rating = 3;
  var timeTaken = "";

  /**
   * @description  * Display the cards on the page
   *   - shuffle the list of cards using the provided "shuffle" method below
   *   - loop through each card and create its HTML
   *   - add each card's HTML to the page
   */
  function restartGame() {
      totalMoves = 0;

      $(".moves").html(totalMoves);
      $(".stars").html("<li><i class=\"fa fa-star\"></i></li><li><i class=\"fa fa-star\"></i></li><li><i class=\"fa fa-star\"></i></li>");
      //initializing successCount and totalSeconds to 0
      successCount = 0;
      totalSeconds = 0;

      var shuffledArray = shuffle(cardArray);
      var deckOfCards = createCards(shuffledArray);

      $(".deck").html(deckOfCards);
  }

  /**
   * @description Opens and shows the given card
   * @param {element} cardToOpen - element to open and show
   */
  function openAndShowCard(cardToOpen) {
      //we open the card
      cardToOpen.classList.add("open");
      //To show the card
      cardToOpen.classList.add("showCard");
      //set previous card as current card so we can compare on the next click
      previousCard = cardToOpen;
  }

  /**
   * @description Matches the Cards if thier symbols are same
   * @param {element} previousCardToMatch - previous card to match   *
   * @param {element} currentCardToMatch - current card to match
   */
  function matchCards(previousCardToMatch, currentCardToMatch) {
      currentCardToMatch.classList.add("match");
      currentCardToMatch.classList.add("showCard");

      previousCardToMatch.classList.add("match");
      previousCardToMatch.classList.remove("open");
  }

  /**
   * @description Displays the Cards as unmatched if thier symbols are not same
   * @param {element} previousCardToMatch - previous card to match   *
   * @param {element} currentCardToMatch - current card to match
   */
  function unMatchCards(previousCardToMatch, currentCardToMatch) {
      currentCardToMatch.classList.add("unMatch");

      previousCardToMatch.classList.add("unMatch");
      previousCardToMatch.classList.remove("open");

      //Wait for 500 millisecond and hide wrong answers
      var delayInMilliseconds = 500; //500 milli second
      setTimeout(function() {
          // AFter showing animation remove classes from both current and previous
          previousCardToMatch.classList.remove("showCard");
          previousCardToMatch.classList.remove("unMatch");

          currentCardToMatch.classList.remove("unMatch");
      }, delayInMilliseconds);
  }

  /**
   * @description Displays a Card after performing logical checks
   * @param {element} currentItem - element selected by user
   */
  function showMe(currentItem) {
      //if already shown and click on do nothing
      if (currentItem.className === "card open showCard")
          return;

      if (previousCard === undefined) { //nothing is currently selected
          openAndShowCard(currentItem);
      } else {
          //If both the symbols in the cards are same,open them and change background as matched
          if (previousCard.firstElementChild.className === currentItem.firstElementChild.className) {
              matchCards(previousCard, currentItem);

              successCount++;
              if (successCount === 8) {
                  showSuccess();
              }
          } else {
              unMatchCards(previousCard, currentItem);
          }
          // release the placeholders for previous and currrent cards
          previousCard = undefined;
          currentItem = undefined;
      }
      //Count Moves
      countMoves();
  }


  /**
   * @description  * Display A pop up Modal is shown with its rating,timen taken
   *  and a congradulatory message
   */
  function showSuccess() {
      $(".ratingMessage").text(rating);
      $(".timetakenMessage").text(timeTaken);
      $('#myModal').modal('show');
  }

  /**
   * @description increments the totalMoves when the user makes a move everytime
   */
  function countMoves() {
      totalMoves++;
      var y = document.getElementsByClassName("moves");
      y[0].innerHTML = totalMoves;

      //Displays the rating depending upon the user's move
      var z = document.getElementsByClassName("stars");
      if (totalMoves > 20 && totalMoves <= 32) {
          z[0].innerHTML = "<li><i class=\"fa fa-star\"></i></li><li><i class=\"fa fa-star\"></i></li>";
          rating = 2;
      } else if (totalMoves > 32) {
          z[0].innerHTML = "<li><i class=\"fa fa-star\"></i></li>";
          rating = 1;

      }

  }


  /**
   * @description creates the shuffled cards to be used for the game
   * @param {array} arrayOfCards - array of cards to create cards from
   */
  function createCards(arrayOfCards) {
      var cardHTML = "";

      arrayOfCards.forEach(function(element) {
          cardHTML = cardHTML + "<li class=\"card\"  onclick=\"showMe(this)\" ><i class=\"" + element + "\"></i></li>";
      });

      return cardHTML;
  }

  // Shuffle function from http://stackoverflow.com/a/2450976
  /**
   * @description shuffles cards for the game
   * @param {array} arrayOfCards - array of cards to shuffle
   */
  function shuffle(arrayOfCards) {
      var currentIndex = arrayOfCards.length,
          temporaryValue, randomIndex;

      while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = arrayOfCards[currentIndex];
          arrayOfCards[currentIndex] = arrayOfCards[randomIndex];
          arrayOfCards[randomIndex] = temporaryValue;
      }

      return arrayOfCards;
  }


  var timerVar = setInterval(countTimer, 1000);
  /**
   * @description starts to increment time when the user starts the game
   */
  function countTimer() {
      ++totalSeconds;
      var hour = Math.floor(totalSeconds / 3600);
      var minute = Math.floor((totalSeconds - hour * 3600) / 60);
      var seconds = totalSeconds - (hour * 3600 + minute * 60);
      timeTaken = hour + ":" + minute + ":" + seconds;
      $(".timer").html(timeTaken);
  }
