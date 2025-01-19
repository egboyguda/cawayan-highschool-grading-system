import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/auth";

const routes={
    protected:['/','/students','/teachers','/class']
}

export default async function middleware(req:NextRequest){

    const path = req.nextUrl.pathname;
    const isProtected = routes.protected.includes(path);

    const cookie = (await cookies()).get("session")?.value;
    const session = cookie? await decrypt(cookie):null;

    if(isProtected && !session){
        return NextResponse.redirect(new URL('/login',req.nextUrl));
    }
    if(!isProtected && session){
        return NextResponse.redirect(new URL('/',req.nextUrl));
    }

    
    return NextResponse.next();


}
export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|woff|woff2|ttf|otf|eot|css|js)$).*)",
      ],}