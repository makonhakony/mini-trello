class Board {
    constructor(id, title, owner, user =[], createDate, cards = []) {
      this.id = id; // Firestore will generate this
      this.title = title;
      this.owner = owner;
      this.user = user;
      this.createDate = createDate;
      this.cards = cards; // This will be an array of card objects
    }
  
    // Method to convert Firestore document to Board instance
    static fromFirestore(doc) {
      const data = doc.data();
      return new Board(
        doc.id, 
        data.title,
        data.owner,
        data.user, 
        data.createDate.toDate(), 
        data.cards);
    }
  
    // Method to convert Board instance to Firestore document
    toFirestore() {
      return {
        title: this.title,
        owner: this.owner,
        user: this.user,
        createDate: this.createDate,
        cards: this.cards,
      };
    }
  }