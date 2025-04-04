// app/api/records/route.js
import { connectDB } from '@/lib/mongodb';
import FormData from '@/models/FormData';

export async function POST(req) {
  try {
    const body = await req.json();
    await connectDB();

    const newEntry = await FormData.create({
      name: body.name,
      registrationNumber: body.registrationNumber,
      workDescription: body.workDescription,
      paymentStatus: body.paymentStatus,
      dateTime: body.dateTime || new Date(),
    });

    return new Response(JSON.stringify({ message: 'Data saved successfully', data: newEntry }), {
      status: 201,
    });
  } catch (error) {
    console.error('Error saving data:', error);
    return new Response(JSON.stringify({ error: 'Failed to save data' }), {
      status: 500,
    });
  }
}
