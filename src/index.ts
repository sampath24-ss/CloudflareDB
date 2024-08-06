import { Hono } from "hono";

type Bindings = {
	DB: D1Database
}

const app = new Hono<{Bindings: Bindings}>()
app.get('/' , async c =>{ 
	const resp = await c.env.DB.prepare('select * from movies').all();
	const movies = resp.results

	return c.json(movies)
})

app.get('/favourite' , async c =>{ 
	const resp = await c.env.DB.prepare('select * from movies order by rating desc limit 3').all();
	const movies = resp.results

	return c.json(movies)
})

app.put('/:id' , async c =>{
	const body = await c.req.json()
	const resp = await c.env.DB.prepare('UPDATE movies SET rating = ?1 WHERE id = ?2 RETURNING * ').bind(body.rating, c.req.param('id')).run();
	const ok = resp.success
	return c.json({
		ok
	})
})

export default app