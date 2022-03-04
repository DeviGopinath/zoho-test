const query = {
	query1: 'SELECT name, phone, email FROM contact',
	query2: 'SELECT details.cat_id, details.data_month,details.employee_count FROM details INNER JOIN  unit ON details.unit_id=unit.unit_id WHERE details.data_month >= $1 AND details.data_month <= $2 AND unit.unit=$3',
	query3: 'SELECT category.category, unit.unit, details.employee_count FROM details INNER JOIN unit ON details.unit_id = unit.unit_id INNER JOIN category ON details.cat_id = category.cat_id AND data_month = $1',
	query4: 'INSERT INTO contact(name,phone,email) VALUES($1 ,$2 , $3)',
};

module.exports = query;
