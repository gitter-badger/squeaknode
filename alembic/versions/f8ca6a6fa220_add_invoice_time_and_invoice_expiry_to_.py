"""Add invoice time and invoice expiry to sent offer table

Revision ID: f8ca6a6fa220
Revises: 024b6d0f4407
Create Date: 2020-11-13 02:17:00.487285

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f8ca6a6fa220'
down_revision = '024b6d0f4407'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('sent_offer', schema=None) as batch_op:
        batch_op.add_column(sa.Column('invoice_expiry', sa.Integer(), nullable=False, server_default=sa.text("0")))
        batch_op.add_column(sa.Column('invoice_timestamp', sa.Integer(), nullable=False, server_default=sa.text("0")))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('sent_offer', schema=None) as batch_op:
        batch_op.drop_column('invoice_timestamp')
        batch_op.drop_column('invoice_expiry')

    # ### end Alembic commands ###