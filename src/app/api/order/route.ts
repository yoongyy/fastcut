import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';

export async function POST(request: Request) {
  try {
    // 1. Connect to database
    try {
      await dbConnect();
    } catch (dbError) {
      console.error('Database connection failed:', dbError);
      
      // Let's provide a descriptive error message.
      // To help the user test the frontend even if their DB is not running, we could return a mock ID if the DB connection is missing.
      // But let's check if the URI is a placeholder or not provided, and provide a clear 500.
      return NextResponse.json(
        {
          success: false,
          error: 'Database connection failed. Please check MONGODB_URI configuration in .env.local.',
          details: dbError instanceof Error ? dbError.message : String(dbError),
        },
        { status: 500 }
      );
    }

    // 2. Parse payload
    const body = await request.json();
    const { email, phone, videoUrl, editingStyle, captionPreferences, extraInstructions } = body;

    // 3. Create document
    const newOrder = new Order({
      email,
      phone,
      videoUrl,
      editingStyle,
      captionPreferences: captionPreferences || '',
      extraInstructions: extraInstructions || '',
      status: 'pending',
    });

    // 4. Save to collection (Mongoose will trigger schema validation)
    await newOrder.save();

    // 5. Return success response with 201 status
    return NextResponse.json(
      {
        success: true,
        message: 'Order created successfully',
        orderId: newOrder._id,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('API Error in Order submission:', error);
    
    // Check if Mongoose Validation Error
    if (error && typeof error === 'object' && 'name' in error && error.name === 'ValidationError') {
      const errValidation = error as unknown as { errors: Record<string, { message: string }> };
      const messages = Object.values(errValidation.errors).map((val) => val.message);
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: messages,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'An internal server error occurred.',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
export async function GET() {
  return NextResponse.json({ message: 'Order submission API is online. Use POST to place an order.' });
}
