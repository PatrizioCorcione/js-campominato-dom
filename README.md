PLAY
- leggo la proprietà della griglia (livello)
- RESET
- genero il playground
- genero le bombe

CLICK DELLA CELLA
- verifico se è una bomba
  SI -> FINE GIOCO
  NO -> - coloro la cella
        - incremento il contatore (se non è stata già cliccata)
        - verifico se il punteggio è vincente -> SI -> FINE GIOCO
        
RESET
- cancella la griglia
- azzero il contatore
- svuoto l’array delle bombe
FINE GIOCO
- accendere tutte le bombe
- congelo la griglia
- stampo il messaggio finale con punteggio. Messaggio diverso se vince o perde.
