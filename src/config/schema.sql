CREATE DATABASE veterinaria_go_prod;

DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;

CREATE TABLE person( -- Tabla personas
	id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
	
	-- datos de la personas
	full_name VARCHAR(100) NOT NULL,
	email VARCHAR(100)NOT NULL UNIQUE,
	phone_number VARCHAR(20) NOT NULL,

	-- Restricciones de validacion (CONSTRAINT)
	-- Asegura que el email se unico
	CONSTRAINT uq_person_email UNIQUE (email),
	-- Asegura la estructura del email
	CONSTRAINT chk_person_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
	-- Asegura que los nombres no sean vacios
	CONSTRAINT chk_full_name_not_empty CHECK (TRIM(full_name) <> '')
);

CREATE TABLE species ( -- Tabla de las especies
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
	common_name VARCHAR(100) NOT NULL
);

CREATE TABLE breed( -- Tabla de razas
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	common_name VARCHAR(100) NOT NULL,
	id_species INT NOT NULL, -- FK de las especies

	CONSTRAINT fk_breed_species
		FOREIGN KEY (id_species) 
		REFERENCES species (id)
		ON DELETE RESTRICT
		ON UPDATE CASCADE
);

-- ENUM para restringir el espacio del estado
CREATE TYPE pet_gender AS ENUM ('M', 'F');

CREATE TABLE pet_patients(
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

	name VARCHAR(100) NOT NULL,
	date_birth DATE,
	gender pet_gender NOT NULL,
	color VARCHAR(50),
	is_neutered BOOLEAN,
	is_deceased BOOLEAN,
	id_breed INT NOT NULL, -- FK DE RAZA
	id_owner UUID NOT NULL, -- FK de persona

	CONSTRAINT fk_pet_breed
		FOREIGN KEY (id_breed) 
		REFERENCES breed (id)
		ON DELETE RESTRICT
		ON UPDATE CASCADE,

	CONSTRAINT fk_pet_owner
		FOREIGN KEY (id_owner) 
		REFERENCES persons (id)
		ON DELETE RESTRICT
		ON UPDATE CASCADE
);

CREATE TYPE appointment_type_enum AS ENUM ('Programada', 'Emergencia');
			
CREATE TABLE appointmen_type( -- Tabla de tipo de consulta 
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	name appointment_type_enum NOT NULL
);

CREATE TYPE appointment_status_enum AS ENUM ('Agendada', 'Cancelado', 'Ausente', 'Completa', 'En Curso');

CREATE TABLE appointment_status( -- Tabla de estado de la consulta
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	name appointment_status_enum NOT NULL
);

CREATE TABLE specialties( -- Tabla de especialidades del veterinario
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	name VARCHAR (50)NOT NULL
);

CREATE TABLE veterinarians( -- Tabla de veterinario
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	person_id UUID NOT NULL, --FK Persona
	specialties_id INT NOT NULL, -- Fk especialidad
	
	CONSTRAINT fk_veterinarians_specialties
		FOREIGN KEY (specialties_id) 
		REFERENCES specialties (id)
		ON DELETE RESTRICT
		ON UPDATE CASCADE,

	CONSTRAINT fk_veterinarians_person
		FOREIGN KEY (person_id) 
		REFERENCES persons (id)
		ON DELETE RESTRICT
		ON UPDATE CASCADE
);

CREATE TABLE appointment( -- Tabla de Cita 
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	
	date_at DATE,
	reason VARCHAR(150),
	acompanying_id UUID NOT NULL, -- FK persona
	veterinarian_id INT NOT NULL, -- FK veterinario
	pet_patient_id INT NOT NULL, -- Fk del paciente PETIENT
	appointmen_type_id INT NOT NULL, -- FK tipo de cita
	appointment_status_id INT NOT NULL, -- FK estado de cita

	CONSTRAINT fk_appointment_person
		FOREIGN KEY (acompanying_id) 
		REFERENCES persons (id)
		ON DELETE RESTRICT
		ON UPDATE CASCADE,
	
	CONSTRAINT fk_appointment_veterinarian
		FOREIGN KEY (veterinarian_id) 
		REFERENCES veterinarians (id)
		ON DELETE RESTRICT
		ON UPDATE CASCADE,

	CONSTRAINT fk_appointment_pet_patients
		FOREIGN KEY (pet_patient_id) 
		REFERENCES pet_patients (id)
		ON DELETE RESTRICT
		ON UPDATE CASCADE,

	CONSTRAINT fk_appointment_type
		FOREIGN KEY (appointmen_type_id) 
		REFERENCES appointmen_type (id)
		ON DELETE RESTRICT
		ON UPDATE CASCADE,

	CONSTRAINT fk_appointment_status_id
		FOREIGN KEY (appointment_status_id) 
		REFERENCES appointment_status (id)
		ON DELETE RESTRICT
		ON UPDATE CASCADE
);

CREATE TABLE vaccine( -- Tabla de tipo de vacuna
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	name VARCHAR (50)NOT NULL,
	description VARCHAR(50)
);

CREATE TABLE medicine( -- Tabla de tipo de medicamentos
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	name VARCHAR (50) NOT NULL,
	description VARCHAR(50)
);

CREATE TABLE allergens( -- Tabla de tipo de alergenos
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	name VARCHAR (50) NOT NULL,
	description VARCHAR(50)
);

CREATE TABLE medicine_allergens (
	medicine_id INT,
	allergen_id INT,

	CONSTRAINT pk_medicine_allergens -- PK compuesta
		PRIMARY KEY (medicine_id, allergen_id),

	CONSTRAINT fk_medicine_allergens_medicine
		FOREIGN KEY (medicine_id) 
		REFERENCES medicine (id)
		ON DELETE RESTRICT,
		
	CONSTRAINT fk_medicine_allergens_allergens
		FOREIGN KEY (allergen_id) 
		REFERENCES allergens(id)
		ON DELETE RESTRICT	
	
);

CREATE TABLE patient_allergy ( -- Tabla Intermedia paciete alergia
	patient_id INT,
	allergen_id INT,

	CONSTRAINT pk_patient_allergy -- PK compuesta
		PRIMARY KEY (patient_id, allergen_id),

	CONSTRAINT fk_patient_allergy_patient
		FOREIGN KEY (patient_id) 
		REFERENCES pet_patients (id)
		ON DELETE RESTRICT,
		
	CONSTRAINT fk_patient_allergy_allergen
		FOREIGN KEY (allergen_id) 
		REFERENCES allergens(id)
		ON DELETE RESTRICT	
);

CREATE TABLE vaccine_species ( -- tabla intermedia vacuna especies
	vaccine_id INT,
	specie_id INT,
	
	CONSTRAINT pk_vaccine_specie -- PK compuesta
		PRIMARY KEY (vaccine_id, specie_id),

	CONSTRAINT fk_vaccine_specie_vaccine
		FOREIGN KEY (vaccine_id) 
		REFERENCES vaccine(id)
		ON DELETE RESTRICT,
		
	CONSTRAINT fk_vaccine_specie_species
		FOREIGN KEY (specie_id) 
		REFERENCES species (id)
		ON DELETE RESTRICT
);

CREATE TABLE medical_history( -- Tabla de historial medico
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	date_appointment TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de registro

	--Informacion de la antencion
	attention_description VARCHAR(200),
	
	-- Triaje
	weight REAL NOT NULL,
	temperature REAL NOT NULL,
	preassure VARCHAR (10),

	appointment_id INT,

	--CONSTRAINT pk_medical_history -- PK del historial medico
	--	PRIMARY KEY (id),

	CONSTRAINT fk_medical_history_appointment
		FOREIGN KEY (appointment_id) 
		REFERENCES appointment(id)
		ON DELETE RESTRICT
		ON UPDATE CASCADE
);

CREATE TABLE vaccination_records( -- Tabla de historial de vacuna
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	date_record TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de registro

	--Informacion de la antencion
	attention_description VARCHAR(200),
	
	appointment_id INT,

	-- CONSTRAINT pk_vaccination_records -- PK del historial de vacuna
	--	PRIMARY KEY (id),

	CONSTRAINT fk_vaccination_records_appointment
		FOREIGN KEY (appointment_id) 
		REFERENCES appointment(id)
		ON DELETE RESTRICT
		ON UPDATE CASCADE
);

CREATE TABLE prescriptions(
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	date_record TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

	--Informacion de la antencion
	attention_description VARCHAR(200),
	
	appointment_id INT,

	CONSTRAINT fk_prescriptions_appointment
		FOREIGN KEY (appointment_id) 
		REFERENCES appointment(id)
		ON DELETE RESTRICT
		ON UPDATE CASCADE
);

CREATE TABLE prescription_details(
	prescriptions_id INT,
	medicine_id INT,

	CONSTRAINT pk_prescriptions_medicine -- PK compuesta
		PRIMARY KEY (prescriptions_id, medicine_id),

	CONSTRAINT fk_prescription_details_prescriptions
		FOREIGN KEY (prescriptions_id) 
		REFERENCES prescriptions(id)
		ON DELETE RESTRICT,

	CONSTRAINT fk_prescription_details_medicine
		FOREIGN KEY (medicine_id) 
		REFERENCES medicine (id)
		ON DELETE RESTRICT
);








