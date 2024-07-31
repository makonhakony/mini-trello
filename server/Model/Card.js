class Board {
    constructor(id, info, owner, user =[], createDate, tasks = []) {
      this.id = id; // Firestore will generate this
      this.info = info;
      this.owner = owner;
      this.user = user;
      this.createDate = createDate;
      this.tasks = tasks; // This will be an array of card objects
    }
  
    // Method to convert Firestore document to Board instance
    static fromFirestore(doc) {
      const data = doc.data();
      return new Board(
        doc.id, 
        data.info,
        data.owner,
        data.user, 
        data.createDate.toDate(), 
        data.tasks);
    }
  
    // Method to convert Board instance to Firestore document
    toFirestore() {
      return {
        info: this.info,
        owner: this.owner,
        user: this.user,
        createDate: this.createDate,
        tasks: this.tasks,
      };
    }
  }