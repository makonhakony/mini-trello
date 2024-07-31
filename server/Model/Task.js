class Board {
    constructor(id, cardId, title, description, status) {
      this.id = id; // Firestore will generate this
      this.cardId = cardId;
      this.title = title;
      this.description = description;
      this.status = status;
    }
  
    // Method to convert Firestore document to Board instance
    static fromFirestore(doc) {
      const data = doc.data();
      return new Board(
        doc.id, 
        data.cardId,
        data.title,
        data.description, 
        data.status
    );
    }
  
    // Method to convert Board instance to Firestore document
    toFirestore() {
      return {
        cardId: this.cardId,
        title: this.title,
        description: this.description,
        status: this.status,
      };
    }
  }