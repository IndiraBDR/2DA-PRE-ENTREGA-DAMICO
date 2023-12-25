
class BasicManagerDB {


    constructor(model){

        this.model = model


    }

    
       async findAll() {
   
           const response = this.model.find();
           return response;
   
   
       };
   


    async findById(id) {

        const response = this.model.findById(id);
        return response;

    };

    async createOne(obj) {

        const response = this.model.create(obj);
        return response;

    };

    async updateOne(id, obj) {

        const response = this.model.updateOne({ _id: id }, obj);
        return response;

    };

    async deleteOne(id) {

        const response = this.model.deleteOne({ _id: id });
        return response;

    };


}

export{BasicManagerDB}
export const basicManagerDB = new BasicManagerDB();