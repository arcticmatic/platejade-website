import connect from "../../../../utils/db";
import FaqsDealer from "../../../../models/faqsDealer";
import { NextResponse } from 'next/server';

export async function GET(req) {
    await connect();

    try {
        const FAQ = await FaqsDealer.find();

        return NextResponse.json(
   
            { success: true, data: FAQ },
        );
    } catch (error) {
        console.error("Error fetching FAQs block", error);
        return NextResponse.json({
            status: 500,
            body: { success: false, error: error.message },
        });
    }
}