import bcrypt from 'bcrypt'
import clientPromise from '@/lib/db';

export  async function POST (request) {
    try {
        const client = await clientPromise;
        const db = client.db("users");
        const response = await request.json();
        const { name, email, password } = response;
        const HashPass = await bcrypt.hash(password, 10);
        const userExist = await db.collection("users").findOne({ email: email });
        if (userExist) {
          return new Response("userExist", { status: 409 });
        }
        const user = await db.collection("users").insertOne({
          name: name,
          email: email,
          password: HashPass,
        });
        return new Response({user} , {status : 200})
    } catch (error) {
        return new Response('connect to database is failed' , {status : 502})
    }
}