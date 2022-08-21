const drawCardURL = "https://deckofcardsapi.com/api/deck/new/draw/?count=1"

//1.
async function part1() {
    let drawCard = await $.getJSON(`${drawCardURL}`)
    console.log
        (
            drawCard.cards[0].value.toLowerCase() + " of " + drawCard.cards[0].suit.toLowerCase()
        );
}

part1()


//2.  
async function part2() {
    // new deck, get new deck id 
    let newDeck = await $.getJSON('https://deckofcardsapi.com/api/deck/new/')
    this.deckId = newDeck.deck_id
    
    //shuffle the new deck
    let shuffle = await $.getJSON(`https://deckofcardsapi.com/api/deck/${this.deckId}/shuffle/?remaining=true`)
    
    //draw the first card
    let firstCard = await $.getJSON(`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count1`)
        firstCard = firstCard.cards[0]

    //draw the second card
    let secondCard = await $.getJSON(`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count1`)
        secondCard = secondCard.cards[0]

    // console.log each card
    console.log(`First card is: ${firstCard.value.toLowerCase()} of ${firstCard.suit.toLowerCase()}`)
    console.log(`Second card is: ${secondCard.value.toLowerCase()} of ${secondCard.suit.toLowerCase()}`)   
}
part2()


//3
// HTML page that lets you draw cards from a deck
// when deck loads, go to API to create new deck
// show button on the page that lets you draw a card
// everytime you click the button it draws a new card
// til there are no more cards left in the deck (52)

let baseURL = 'https://deckofcardsapi.com/api/deck';

async function part3() {
    const loadButton = document.querySelector('#load-button')
    let cardImage = null
    let $btn = $('button');

    // load a brand new deck/shuffle deck
    let newDeck = await $.getJSON(`${baseURL}/new/shuffle/`)
 
    loadButton.addEventListener('click', async function() {
        //shuffle the new deck
        let drawCard = await $.getJSON(`${baseURL}/${newDeck.deck_id}/draw/`)
        cardImage = drawCard.cards[0].image
    
        const newCard = makeCardDiv (
            cardImage
        )                

        function makeCardDiv(src) {
            let img = document.createElement('img');
            img.setAttribute('src', src);

            const cardDiv = document.querySelector('#card-spot')
            cardDiv.setAttribute('class', 'cardDiv')
            cardDiv.appendChild(img)
        }
    
        if (drawCard.remaining  === 0) {
            $btn.remove()   
        }
    }) 
}
part3()