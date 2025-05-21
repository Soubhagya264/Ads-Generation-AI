import { mutation } from './_generated/server';

export const CreatedNewUser = mutation(async (ctx, args) => {
  const existingUser = await ctx.db
    .query("users")
    .withIndex("by_email", (q) => q.eq("email", args.email))
    .first(); 

  if (existingUser) {
    return existingUser;
  }

  const newUser = {
    name: args.name,
    email: args.email,
    picture: args.picture,
    credits: 20,
  };

  const insertedId = await ctx.db.insert("users", newUser);

  return { ...newUser, _id: insertedId };
});


// update user
export const UpdateUser = mutation(async (ctx, args) => {
  const result = await ctx.db
    .query("users")
    .filter((q) => q.eq(q.field("_id"), args._id))
    .collect();

  if (result.length === 0) return;

  await ctx.db.patch(result[0]._id, {
    ...args,
  });
});
// get user credit
export const GetUserCredit = mutation(async (ctx, args) => {
  const result = await ctx.db
    .query("users")
    .filter((q) => q.eq(q.field("_id"), args._id))
    .collect();
  return result[0]?.credits;
});
