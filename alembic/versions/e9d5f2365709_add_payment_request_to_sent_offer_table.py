"""Add payment request to sent offer table

Revision ID: e9d5f2365709
Revises: 59c8e45671e1
Create Date: 2020-11-15 00:33:58.799762

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e9d5f2365709'
down_revision = '59c8e45671e1'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('sent_offer', schema=None) as batch_op:
        batch_op.add_column(sa.Column('payment_request', sa.String(), nullable=False, server_default=''))
        batch_op.add_column(sa.Column('preimage', sa.String(length=64), nullable=False, server_default=''))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('sent_offer', schema=None) as batch_op:
        batch_op.drop_column('preimage')
        batch_op.drop_column('payment_request')

    # ### end Alembic commands ###