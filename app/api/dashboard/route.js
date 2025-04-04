// app/api/dashboard/route.js
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import FormData from '@/models/FormData';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const nameQuery = searchParams.get('name');

    let filter = {};
    if (nameQuery) {
      filter.name = { $regex: new RegExp(nameQuery, 'i') }; // case-insensitive search
    }

    const records = await FormData.find(filter).sort({ dateTime: -1 });
    return NextResponse.json({ success: true, data: records });
  } catch (err) {
    console.error('GET error:', err);
    return NextResponse.json({ success: false, error: 'Failed to fetch data' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
    }

    await FormData.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (err) {
    console.error('DELETE error:', err);
    return NextResponse.json({ success: false, error: 'Failed to delete record' }, { status: 500 });
  }
}
