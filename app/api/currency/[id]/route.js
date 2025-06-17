import dbconnect from "../../../lib/mongodb";
import Currency from "../../../models/Currency";
import Car from "../../../models/Car.js"
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  await dbconnect();
  const body = await req.json();
  
  const currentCurrency = await Currency.findById(params.id);
  if (!currentCurrency) {
    return NextResponse.json({ error: "Currency not found" }, { status: 404 });
  }
  
  if (body.isDefault && !currentCurrency.isDefault) {
    const prevDefault = await Currency.findOne({ isDefault: true });
    const allCurrencies = await Currency.find({ _id: { $ne: params.id } });
    
    const conversionFactor = parseFloat((1 / currentCurrency.value).toFixed(5));
    
    const session = await Currency.startSession();
    
    try {
      session.startTransaction();

      const cars = await Car.find({}).session(session);
      for (const car of cars) {
        const newPrice = parseFloat((car.price * currentCurrency.value).toFixed(2));
        await Car.findByIdAndUpdate(
          car._id,
          { $set: { price: newPrice } },
          { session }
        );
      }

      if (prevDefault) {
        const newPrevDefaultValue = prevDefault.value * conversionFactor;
        await Currency.findByIdAndUpdate(
          prevDefault._id, 
          { isDefault: false, value: newPrevDefaultValue },
          { session }
        );
      }

      for (const currency of allCurrencies) {
        if (currency._id.toString() !== prevDefault?._id?.toString()) {
          const newValue = parseFloat((currency.value * conversionFactor).toFixed(5));
          await Currency.findByIdAndUpdate(
            currency._id, 
            { value: newValue },
            { session }
          );
        }
      }

      const updated = await Currency.findByIdAndUpdate(
        params.id, 
        { ...body, value: 1, isDefault: true },
        { new: true, session }
      );
      
      await session.commitTransaction();
      return NextResponse.json(updated);
    } catch (error) {
      await session.abortTransaction();
      console.error("Transaction failed:", error);
      return NextResponse.json({ error: "Failed to update currencies" }, { status: 500 });
    } finally {
      session.endSession();
    }
  } 
  else if (!body.isDefault && currentCurrency.isDefault) {
    return NextResponse.json(
      { error: "Cannot unset default currency. Please set another currency as default first." }, 
      { status: 400 }
    );
  } 
  else {
    const updated = await Currency.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json(updated);
  }
}

export async function DELETE(req, { params }) {
  await dbconnect();
  
  const currencyToDelete = await Currency.findById(params.id);
  
  if (currencyToDelete && currencyToDelete.isDefault) {
    return NextResponse.json(
      { error: "Cannot delete default currency. Please set another currency as default first." },
      { status: 400 }
    );
  }
  
  await Currency.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}

export async function GET(req, { params }) {
  await dbconnect();
  try {
    const currency = await Currency.findById(params.id);
    if (!currency) {
      return NextResponse.json({ error: "Currency not found" }, { status: 404 });
    }
    return NextResponse.json(currency, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid ID or server error" }, { status: 500 });
  }
}
