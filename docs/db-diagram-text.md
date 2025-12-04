DB diagram created using https://dbdiagram.io/d

Table users {
  id varchar [pk]
  first_name varchar [not null]
  last_name varchar [not null]
  email varchar [unique, not null]
  password varchar [not null]
}

Table practitioners {
  id integer [pk]
  name varchar
  description varchar [not null]
  user_id varchar [not null]
  contact_id varchar
}

Table contacts {
  id varchar [pk]
  phone_number varchar
  email varchar
  website varchar
  socialMedia json
}

Table services {
  id varchar [pk]
  name varchar [not null]
  description varchar [not null]
  online boolean [not null]
  in_person boolean [not null]
  practitioner_id varchar [not null]
}

Table reviews {
  id varchar [pk]
  body varchar 
  rating integer [not null]
  reviewing_user_id varchar [not null]
  practitioner_id varchar
  service_id varchar
  business_id varchar
}

Table businesses {
  id varchar [pk]
  name varchar [not null]
  description varchar [not null]
  owner_user_id varchar [not null]
  address varchar [not null]
  contact_id varchar [not null]
}

Table practitioners_businesses {
  id varchar [pk]
  business_id varchar [not null]
  practitioner_id varchar [not null]
}

Ref: practitioners.user_id - users.id
Ref: practitioners.contact_id - contacts.id

Ref: services.practitioner_id > practitioners.id

Ref: businesses.owner_user_id - users.id
Ref: businesses.contact_id - contacts.id

Ref: reviews.reviewing_user_id > users.id
Ref: reviews.practitioner_id > practitioners.id
Ref: reviews.service_id > services.id
Ref: reviews.business_id > businesses.id

Ref: practitioners_businesses.practitioner_id > practitioners.id
Ref: practitioners_businesses.business_id > businesses.id